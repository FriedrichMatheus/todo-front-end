export function Image({
  src,
  ...rest
}: React.DetailedHTMLProps<
  React.ImgHTMLAttributes<HTMLImageElement>,
  HTMLImageElement
>) {
  return <img src={src} {...rest} />;
}
