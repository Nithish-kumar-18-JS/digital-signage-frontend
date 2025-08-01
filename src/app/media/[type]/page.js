import ImageLibrary from '@/components/media/ImageLibrary';

export default async function Page({
  params,
}) {
  const { type } = await params;
  return <ImageLibrary type={type} />;
}
