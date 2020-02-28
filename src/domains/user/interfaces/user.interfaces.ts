export interface UserDataInterface {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
}

export interface SearchUserInterface {
  search: string;
}

export interface UsersApiResponseBody {
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
  data: UserDataInterface[];
}
