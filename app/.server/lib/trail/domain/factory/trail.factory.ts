import Trail from '../entity/trail';

interface TrailFactoryProps {
    id: string;
    title: string;
    themeId: string;
}

export default class TrailFactory {
  public static create(props: TrailFactoryProps): Trail {

    const trail = new Trail(
      props.id,
      props.title,
      props.themeId,
    );

    return trail;
  }
}