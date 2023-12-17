import FAQCard from "./FAQCard";
export default function FAQ({
  questionOne,
  answerOne,
  questionTwo,
  answerTwo,
  questionThree,
  answerThree,
}) {
  return (
    <div className="bg-light pb-24 text-center">
      <h1 className="md:pt-24 pt-16 md:pb-12 pb-8 text-black  md:text-6xl text-4xl font-bold">
        Got any questions?
      </h1>

      <div className="lg:w-8/12 w-11/12  mx-auto pb-12">
        <FAQCard question={questionOne} answer={answerOne} />
        <FAQCard question={questionTwo} answer={answerTwo} />
        <FAQCard question={questionThree} answer={answerThree} />
      </div>
    </div>
  );
}
