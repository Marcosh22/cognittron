import Step from '../entity/step';

interface StepFactoryProps {
    id: string;
    title: string;
    content: string;
    trailId: string;
}

export default class StepFactory {
  public static create(props: StepFactoryProps): Step {

    const step = new Step(
      props.id,
      props.title,
      props.content,
      props.trailId,
    );

    return step;
  }
}