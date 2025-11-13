import { test, expect, APIRequestContext } from '@playwright/test';
import { ApiService } from '../api/ApiService';

// --- API Types (based on the OpenAPI spec) ---

interface DogApiAttributes {
  name?: string;
  description?: string;
  life?: { min: number; max: number };
  male_weight?: { min: number; max: number };
  female_weight?: { min: number; max: number };
  hypoallergenic?: boolean;
  body?: string;
}

interface DogApiRelationshipData {
  id: string;
  type: string;
}

interface DogApiRelationships {
  breeds: {
    data: DogApiRelationshipData[];
  };
}

interface DogApiData {
  id: string;
  type: string;
  attributes: DogApiAttributes;
  relationships?: DogApiRelationships;
}

interface DogApiResponse {
  data: DogApiData | DogApiData[];
  links?: {
    self: string;
    current?: string;
    next?: string;
    last?: string;
  };
  meta?: {
    pagination?: {
      current: number;
      records: number;
    };
  };
}

// --- Test Suite ---

test.describe.parallel('Dog API', () => {
  let api: ApiService;

  test.beforeEach(({ request }) => {
    // This 'request' is created from playwright.config.ts
    // and already has the correct baseURL (https://dogapi.dog)
    api = new ApiService(request);
  });

  // --- /facts Endpoint ---

  test.describe('GET /facts', () => {
    test('200 OK - should get a list of 3 facts', async () => {
      const response = await api.getFacts(3);

      // --- DEBUG LOGGING ---
      // If the test fails, print the status and body to the console
      if (!response.ok()) {
        console.error(
          `Test failed. Status: ${response.status()}, Body: ${await response.text()}`
        );
      }
      // --- END DEBUG LOGGING ---

      // Check status code
      expect(response.ok()).toBe(true);
      expect(response.status()).toBe(200);

      // Check response body
      const body: DogApiResponse = await response.json();
      expect(Array.isArray(body.data)).toBe(true);
      expect(body.data.length).toBe(3);
      expect((body.data[0] as DogApiData).type).toBe('fact');
      expect(
        (body.data[0] as DogApiData).attributes.body
      ).toBeDefined();
    });
  });

  // --- /breeds Endpoint ---

  test.describe('GET /breeds', () => {
    test('200 OK - should get a paginated list of breeds', async () => {
      const response = await api.getBreeds(1, 10); // Page 1, 10 results

      // --- DEBUG LOGGING ---
      if (!response.ok()) {
        console.error(
          `Test failed. Status: ${response.status()}, Body: ${await response.text()}`
        );
      }
      // --- END DEBUG LOGGING ---

      // Check status code
      expect(response.ok()).toBe(true);
      expect(response.status()).toBe(200);

      // Check response body
      const body: DogApiResponse = await response.json();
      expect(Array.isArray(body.data)).toBe(true);
      expect(body.data.length).toBe(10);
      expect((body.data[0] as DogApiData).type).toBe('breed');
      expect(
        (body.data[0] as DogApiData).attributes.name
      ).toBeDefined();

      // FIX: Check if the link *contains* the base path, as params are expected.
      expect(body.links?.self).toContain(
        'https://dogapi.dog/api/v2/breeds'
      );
      expect(body.meta?.pagination?.current).toBe(1);
    });

    test('200 OK - should get a single breed by ID', async () => {
      // FIX: First, get a list of breeds to find a valid, random ID.
      const breedsResponse = await api.getBreeds(1, 1);
      expect(breedsResponse.ok(), 'Failed to get breed list first').toBe(true);
      const breedsBody: DogApiResponse = await breedsResponse.json();
      const breedId = (breedsBody.data[0] as DogApiData).id;
      const breedName = (breedsBody.data[0] as DogApiData).attributes.name;

      // Now, test the getBreedById endpoint with the valid ID.
      const response = await api.getBreedById(breedId);

      // Check status code
      expect(response.ok()).toBe(true);
      expect(response.status()).toBe(200);

      // Check response body
      const body: DogApiResponse = await response.json();
      expect(Array.isArray(body.data)).toBe(false); // Should be a single object
      expect((body.data as DogApiData).id).toBe(breedId);
      expect((body.data as DogApiData).type).toBe('breed');
      // Check that the name matches what we got from the list
      expect(
        (body.data as DogApiData).attributes.name
      ).toBe(breedName);
    });

    test('404 Not Found - should fail for a non-existent breed', async () => {
      const response = await api.getBreedById('non-existent-id');

      // Check status code
      expect(response.ok()).toBe(false);
      expect(response.status()).toBe(404);
    });
  });

  // --- /groups Endpoint ---

  test.describe('GET /groups', () => {
    test('200 OK - should get a list of groups', async () => {
      const response = await api.getGroups();

      // --- DEBUG LOGGING ---
      if (!response.ok()) {
        console.error(
          `Test failed. Status: ${response.status()}, Body: ${await response.text()}`
        );
      }
      // --- END DEBUG LOGGING ---

      // Check status code
      expect(response.ok()).toBe(true);
      expect(response.status()).toBe(200);

      // Check response body
      const body: DogApiResponse = await response.json();
      expect(Array.isArray(body.data)).toBe(true);
      expect(body.data.length).toBeGreaterThan(0);
      expect((body.data[0] as DogApiData).type).toBe('group');
      expect(
        (body.data[0] as DogApiData).attributes.name
      ).toBeDefined();
      expect(
        (body.data[0] as DogApiData).relationships?.breeds
      ).toBeDefined();
    });

    test('404 Not Found - should fail for a non-existent group', async () => {
      const response = await api.getGroupById('non-existent-id');

      // Check status code
      expect(response.ok()).toBe(false);
      expect(response.status()).toBe(404);
    });
  });
});