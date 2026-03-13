{ stdenv, autoPatchelfHook, makeWrapper }:

stdenv.mkDerivation rec {
  pname = "picus";
  version = "1.0";

  src = ./.; # Assumes all necessary files are in the current directory or adjust this accordingly

  nativeBuildInputs = [ autoPatchelfHook makeWrapper ];

  buildInputs = [];

  dontBuild = true;

  installPhase = ''
    mkdir -p $out/bin
    cp -r node_modules/@picus/compositor-linux-arm64-gnu $out/bin/

    # Auto patch the binary with the correct interpreter and RPATH
    autoPatchelf $out

    # Create a wrapper to set any necessary environment variables
    makeWrapper $out/bin/compositor-linux-arm64-gnu/picus $out/bin/picus
  '';

  meta = {
    description = "Picus application with custom dependencies";
    homepage = "http://picus.dev";
    license = stdenv.lib.licenses.mit;
  };
}
