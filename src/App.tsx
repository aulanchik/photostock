import React, { useCallback, useRef } from "react";
import { Upload, Header, Footer } from "@/components";
import { Grid } from "@/containers";

const App: React.FC = (): JSX.Element => {
  const gridRef = useRef<{ fetchImages: () => void }>(null);

  const handleUploadComplete = useCallback(() => {
    gridRef.current?.fetchImages();
  }, []);

  return (
    <main>
      <Header />
      <Upload onUploadComplete={handleUploadComplete} />
      <Grid ref={gridRef} />
      <Footer />
    </main>
  );
};

export default App;
