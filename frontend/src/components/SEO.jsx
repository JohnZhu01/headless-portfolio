export default function SEO({ title, description }) {
  return (
    <>
      <title>{`${title} | Johnny Zhu`}</title>
      <meta name="description" content={description} />
    </>
  );
}
