import { useRouter } from 'next/router'
import ImageLibrary from '@/components/media/ImageLibrary';
 
export default function Page() {
  const router = useRouter()
  return <ImageLibrary type={router.query.type as string} />
}
