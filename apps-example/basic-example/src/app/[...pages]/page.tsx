const Page = ({ params }: any) => {
  console.log(params);

  return <div className="flex w-screen h-screen bg-red-500 items-center justify-center">{params.pages.join('/')}</div>;
};

export default Page;
