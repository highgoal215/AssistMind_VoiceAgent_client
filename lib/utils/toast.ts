import { toast } from 'sonner'

export const showToast = {
  success: (message: string) => {
    toast.success(message, {
      duration: 4000,
      position: 'top-right',
    })
  },
  
  error: (message: string) => {
    toast.error(message, {
      duration: 5000,
      position: 'top-right',
    })
  },
  
  loading: (message: string) => {
    return toast.loading(message, {
      position: 'top-right',
    })
  },
  
  dismiss: (toastId: string | number) => {
    toast.dismiss(toastId)
  }
} 