{ pkgs ? import <nixpkgs> {} }:
(pkgs.mkShell {
  name = "pip-env";
  nativeBuildInputs = with pkgs; [
    nodejs
    nodePackages.prettier
    python3
    python3Packages.pip
	python3Packages.uv
    python3Packages.virtualenv
    stdenv.cc
    gnumake
    black
  ];

  shellHook = ''
    export LD_LIBRARY_PATH=${pkgs.lib.makeLibraryPath [
        pkgs.stdenv.cc.cc
    ]};
  '';
})
