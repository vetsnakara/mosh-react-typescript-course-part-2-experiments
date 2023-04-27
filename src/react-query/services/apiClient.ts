import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com",
});

export class ApiClient<T> {
  constructor(public endpoint: string) {}

  getAll = () => axiosInstance.get<T[]>(this.endpoint).then((res) => res.data);

  post = (data: T) =>
    axiosInstance.post<T>(this.endpoint, data).then((res) => res.data);
}
