import logo from "/icon.png";

export const Header = () => (
  <header className="flex justify-center items-center py-5">
    <img src={logo} className="rounded-full w-14" alt="Pokemon" />
    <h1 className="text-xl ml-2 uppercase">Pokemon App</h1>
  </header>
);
