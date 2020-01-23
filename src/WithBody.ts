export type WithBody<T, B> = T & Omit<T, 'body'> & { body: B }
