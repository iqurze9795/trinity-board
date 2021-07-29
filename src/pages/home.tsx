import { useWallet } from "../hooks/useWallet";

export const Home = () => {
  const { walletProvider } = useWallet()

  return (
    <>
      home
    </>
  );
}