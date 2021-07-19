import { Helmet } from "react-helmet";

interface Props {
  twinPrice: string;
  dopPrice: string;
}

const PriceTitle = ({ twinPrice, dopPrice }: Props) => {
  return (
    <Helmet defer={false}>
      <title>
        Trinity board | Best DEFI traking tool.
      </title>
    </Helmet>
  );
};

export default PriceTitle;
