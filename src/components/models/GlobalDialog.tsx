    import { Button } from "@/components/ui/button"
    import {
      Dialog,
      DialogClose,
      DialogContent,
      DialogDescription,
      DialogFooter,
      DialogHeader,
      DialogTitle,
      DialogTrigger,
    } from "@/components/ui/dialog"
    
    export function GlobalDialog({
      children,
      title,
      description,
      action,
      confirmText,
      cancelText
    }: {
      children: React.ReactNode
      title: string
      description: string
      action: () => void
      confirmText: string
      cancelText: string
    }) {    
      return (
        <Dialog>
          <DialogTrigger asChild>
            <Button
              className="bg-blue-500 text-white px-2 py-3 rounded hover:bg-blue-600"
              variant="default"
            >
              {children}
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <form className="flex flex-col gap-4" onSubmit={action}>
              <DialogHeader>
                <DialogTitle>{title}</DialogTitle>
                <DialogDescription>{description}</DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <DialogClose asChild>
                  <Button variant="outline">
                    {cancelText}
                  </Button>
                </DialogClose>
                <Button type="submit">
                  {confirmText}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      )
    }
    