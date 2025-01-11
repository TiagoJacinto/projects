export interface Database<TConnection> {
  connect(): Promise<void>;
  getConnection(): TConnection;
}
