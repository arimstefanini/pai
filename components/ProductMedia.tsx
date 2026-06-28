type ProductMediaProps = {
  id: string;
  src: string;
  poster: string;
  label: string;
};

export function ProductMedia({ id, src, poster, label }: ProductMediaProps) {
  return (
    <video
      data-product-video-id={id}
      className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
      muted
      playsInline
      preload="metadata"
      poster={poster}
      aria-label={label}
    >
      <source src={src} type="video/mp4" />
      Seu navegador não suporta vídeo HTML5.
    </video>
  );
}
