export default function Modal({
  selectedAnime,
  modalOpen,
  handleSelectedAnime,
  posTop
}) {
  return (
    <>
    {modalOpen && (
      <div
        className={`min-w-96 bg-neutral-300/65 backdrop-blur top-[1504px] rounded-lg m-4`}
        style={!modalOpen ? { display: "hidden" } : { position: "absolute", top: posTop+"px" }}
      >
        <div className="flex justify-center items-center flex-col text-center p-4">
          <h1 className="text-center font-bold text-lg">{selectedAnime.title}</h1>
          <img className="w-50 my-4" src={selectedAnime.images.jpg.image_url} alt={selectedAnime.title} />
          <p className="my-4 font-semibold">{selectedAnime.synopsis}</p>
          <button
            className="bg-red-600 rounded-full h-10 w-10 mt-2 p-2 font-bold text-black"
            onClick={() => handleSelectedAnime(selectedAnime)}
          >
            X
          </button>
        </div>
      </div>
    )}
    </>
  );
}
