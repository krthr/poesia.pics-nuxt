interface AppError {
  message: string;
  code: string;
}

export const useAppStore = defineStore("app", () => {
  const error = ref<AppError | undefined>(undefined);

  function setError(err: AppError) {
    error.value = err;
  }

  return { error, setError };
});
