import { useRef } from "react";
import useSWRInfinite from "swr/infinite";

export default function TestSwr() {
  const isList = useRef<boolean>(false);

  const getKey = (pageIndex: any, previousPageData: any) => {
    // console.log(pageIndex, "pageIndex", previousPageData, "previousPageData");

    if (!previousPageData) return { pageNum: pageIndex + 1, pageSize: 10 };

    return {
      pageNum: pageIndex + 1,
      pageSize: previousPageData[previousPageData.length - 1],
    };
  };
  const fetcher = async (params: any) => {
    // console.log(params,'params')
    return fetch("http://localhost:3001/data", {
      method: "post", // 请求方法
      headers: {
        "Content-Type": "application/json", // 请求头
      },
      body: JSON.stringify(params),
    })
      .then((res) => res.json())
      .then((data) => data);
  };

  const { data, size, isLoading, mutate, setSize } = useSWRInfinite(
    getKey,
    fetcher,
    {
      initialSize: 1,
    }
  );
  // console.log(data, size, setSize, 1, isLoading);
  //   setSize(size + 1)

  const fn = (is: boolean) => {
    if (is) {
      setSize(size + 1);
    }
  };
  return (
    <>
      {isLoading ? (
        <div>loading</div>
      ) : (
        data &&
        data.map((item, index) => {
          return item.data.map((i: any, key: any) => {
            return <div key={key}>{i}</div>;
          });
        })
      )}
      <div onClick={() => fn(true)}>确认</div>
    </>
  );
}
