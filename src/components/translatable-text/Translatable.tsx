import { FormattedMessage } from 'react-intl';

type Props = {
  text?: string;
  // children?: any;
}

export default function Translatable({ text }: Props ) {
  return (
    <FormattedMessage id={text}/>
  )
}
