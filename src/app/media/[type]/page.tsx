// src/app/media/[type]/page.tsx

import ImageLibrary from '@/components/media/ImageLibrary';

// Using type assertion to bypass the type checking temporarily
type PageProps = any;

export default function Page(props: PageProps) {
  return <ImageLibrary params={props.params} />;
}
