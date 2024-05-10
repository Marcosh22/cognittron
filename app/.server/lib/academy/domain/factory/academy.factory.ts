import Academy from '../entity/academy';

interface AcademyFactoryProps {
    id: string;
    title: string;
}

export default class AcademyFactory {
  public static create(props: AcademyFactoryProps): Academy {

    const academy = new Academy(
      props.id,
      props.title,
    );

    return academy;
  }
}