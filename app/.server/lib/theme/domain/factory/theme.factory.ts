import Theme from '../entity/theme';

interface ThemeFactoryProps {
    id: string;
    title: string;
    academyId: string;
}

export default class ThemeFactory {
  public static create(props: ThemeFactoryProps): Theme {

    const theme = new Theme(
      props.id,
      props.title,
      props.academyId,
    );

    return theme;
  }
}