import { useQuery } from "@tanstack/react-query"
import { api } from "./lib/axios"

export type ApiDto = {
  data: { name: string, email: string, age: number }[],
  count: number,
}

export const getUsers = () => {
  return api.get<ApiDto>('/users').then(res => res.data)
}

export const useGetUsers = () => useQuery({
  queryKey: ['users'],
  queryFn: () => getUsers(),
})