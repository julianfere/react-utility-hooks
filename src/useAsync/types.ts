type UseAsyncOptions<T> = Partial<{
  manual: boolean;
  onSuccess: (data: T) => void;
  onError: (error: any) => void;
  cancelable: boolean;
}>;

enum AsyncStatus {
  Idle = "idle",
  Pending = "pending",
  Fulfilled = "fulfilled",
  Rejected = "rejected",
}

export type { UseAsyncOptions };
export { AsyncStatus };
