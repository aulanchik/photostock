import { FC } from "react";
import Grid from "@/components/grid";
import Header from "@/components/header";
import UploadDialog from "@/components/upload";
import Footer from "@/components/footer";
import { useFetch } from "@/hooks/useFetch";

const App: FC = (): JSX.Element => {
  const { images, loading, error, fetchImages } = useFetch();

  const handleUploadComplete = () => {
    fetchImages();
  };

  return (
    <>
      <Header />
      <UploadDialog onUploadComplete={handleUploadComplete} />
      <Grid images={images} loading={loading} error={error} />
      <Footer />
    </>
  );
};

export default App;
