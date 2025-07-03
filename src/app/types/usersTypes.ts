export interface UsersResponse {
  page:        number;
  per_page:    number;
  total:       number;
  total_pages: number;
  data:        User[];
  support:     Support;
}

export interface User {
  id:         number;
  email:      string;
  first_name: string;
  last_name:  string;
  avatar:     string;
}

export interface Support {
  url:  string;
  text: string;
}

export interface ErrorResponse {
  error:          string;
  how_to_get_one: string;
}

