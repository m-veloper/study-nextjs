import Head from "next/head";
import Axios from "axios";
import Item from "../../src/component/Item/Item";
import {useRouter} from "next/router";
import { Dimmer, Loader } from "semantic-ui-react";


/**
 * 정적페이지
 * @param item
 * @param name
 * @returns {JSX.Element}
 * @constructor
 */
const Post = ({ item, name }) => {
  const router = useRouter();

  if (router.isFallback) {
    return (
      <div style={{ padding: "100px 0" }}>
        <Loader active inline="centered">
          Loading
        </Loader>
      </div>
    );
  }
  return (
    <>
      {item && (
        <>
          <Head>
            <title>{item.name}</title>
            <meta name="description" content={item.description}></meta>
          </Head>
          {name} 환경 입니다.
          <Item item={item} />
        </>
      )}
    </>
  );
};

export default Post;

export async function getStaticPaths() {
  const apiUrl = process.env.apiUrl;
  const res = await Axios.get(apiUrl);
  const data = res.data;

  return {
    // data 전체를 빌드하면 많은 정적 페이지가 만들어짐. 빌드시간도 오래걸림.
    // slice 함수를 사용하여 특정 범위의 페이지들만 만들어지게함.
    paths: data.slice(0, 9).map((item) => ({
      params: {
        id: item.id.toString(),
      },
    })),
    fallback: true,
  };

  // return {
  //   paths: [
  //     { params: { id: "740" } },
  //     { params: { id: "730" } },
  //     { params: { id: "729" } },
  //   ],
  //   fallback: true,
  // };
}

export async function getStaticProps(context) {
  const id = context.params.id;
  const apiUrl = `http://makeup-api.herokuapp.com/api/v1/products/${id}.json`;
  const res = await Axios.get(apiUrl);
  const data = res.data;

  return {
    props: {
      item: data,
      name: process.env.name,
    },
  };
}

/**
 *
 * Next js 모든 페이지 사전 렌더링 (Pre-rendering)
 더 좋은 퍼포먼스
 검색엔진최적화(SEO)
 1. 정적 생성
 2. Server Side Rendering (SSR, Dynamic Rendering)
 차이점은 언제 html 파일을 생성하는가
 [정적 생성]
 - 프로젝트가 빌드하는 시점에 html파일들이 생성
 - 모든 요청에 재사용
 - 퍼포먼스 이유로, 넥스트 js는 정적 생성을 권고
 - 정적 생성된 페이지들은 CDN에 캐시
 - getStaticProps / getStaticPaths
 [서버사이드 렌더링]은 매 요청마다 html 을 생성
 - 항상 최신 상태 유지
 - getServerSideProps
 */

