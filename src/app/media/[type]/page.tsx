// src/app/media/[type]/page.tsx

import ImageLibrary from '@/components/media/ImageLibrary';

interface PageProps {
  params: {
    type: string;
  };
}

export default function Page({ params }: PageProps) {
  return <ImageLibrary type={params.type} />;
}
