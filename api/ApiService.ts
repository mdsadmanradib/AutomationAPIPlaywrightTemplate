import { APIRequestContext, APIResponse } from '@playwright/test';

/**
 * API Service class for the Dog API.
 * It encapsulates all the API endpoint logic.
 */
export class ApiService {
  private request: APIRequestContext;
  private readonly v2_path: string = '/api/v2';

  constructor(request: APIRequestContext) {
    this.request = request;
  }

  // --- Breeds Endpoints ---

  /**
   * Gets a list of dog breeds with optional pagination.
   * @param page - Page number
   * @param size - Number of records per page
   * @returns The APIResponse object.
   */
  async getBreeds(page?: number, size?: number): Promise<APIResponse> {
    return this.request.get(`${this.v2_path}/breeds`, {
      params: {
        'page[number]': page,
        'page[size]': size,
      },
    });
  }

  /**
   * Gets a single dog breed by its ID.
   * @param id - The UUID of the breed.
   * @returns The APIResponse object.
   */
  async getBreedById(id: string): Promise<APIResponse> {
    return this.request.get(`${this.v2_path}/breeds/${id}`);
  }

  // --- Facts Endpoints ---

  /**
   * Gets a list of dog facts.
   * @param limit - Number of facts to return (max 5)
   * @returns The APIResponse object.
   */
  async getFacts(limit?: number): Promise<APIResponse> {
    return this.request.get(`${this.v2_path}/facts`, {
      params: {
        limit,
      },
    });
  }

  // --- Groups Endpoints ---

  /**
   * Gets a list of dog groups with optional pagination.
   * @param page - Page number
   * @param size - Number of records per page
   * @returns The APIResponse object.
   */
  async getGroups(page?: number, size?: number): Promise<APIResponse> {
    return this.request.get(`${this.v2_path}/groups`, {
      params: {
        'page[number]': page,
        'page[size]': size,
      },
    });
  }

  /**
   * Gets a single dog group by its ID.
   * @param id - The UUID of the group.
   * @returns The APIResponse object.
   */
  async getGroupById(id: string): Promise<APIResponse> {
    return this.request.get(`${this.v2_path}/groups/${id}`);
  }
}