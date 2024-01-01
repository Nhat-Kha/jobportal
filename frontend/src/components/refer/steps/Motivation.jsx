export default function Motivation({ referrer, addMotivation }) {
  return (
    <>
      <h2 className="mt-8 text-4xl font-semibold text-gray-900 leading-none">
        Why should your friend get hired?
      </h2>
      <textarea
        className="mt-6 block border border-grey-light w-full p-3 rounded mb-4 focus:ring-primary focus:border-primary"
        rows="8"
        placeholder="You should hire X because of Y..."
        value={referrer.motivation}
        onChange={(e) =>
          addMotivation({ ...referrer, motivation: e.target.value })
        }
      />
    </>
  );
}
