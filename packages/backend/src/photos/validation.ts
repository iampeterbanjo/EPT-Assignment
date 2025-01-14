import {ExecuteStatementCommandOutput} from '@aws-sdk/client-dynamodb';
import {Static, Type} from '@sinclair/typebox';

type Modify<T, R> = Omit<T, keyof R> & R;

export type PhotoExtraEntity = {
  rotate?: number;
  border?: number;
  texture?: string;
};

export type PhotoEntity = {
  id: string;
  orderCount: number;
  category: string;
  extra?: PhotoExtraEntity;
};

export type PhotoCommandOutput = Modify<
  ExecuteStatementCommandOutput,
  {
    Items?: PhotoEntity[];
  }
>;

export const PhotosReply = Type.Array(
  Type.Object({
    id: Type.String(),
    category: Type.String(),
    orderCount: Type.Number(),
    extra: Type.Optional(
      Type.Partial(
        Type.Object({
          texture: Type.String(),
          border: Type.Number(),
          rotate: Type.Number(),
        })
      )
    ),
  })
);

export type PhotosReplyType = Static<typeof PhotosReply>;

export const PhotosQueryTexture = Type.Union([
  Type.Literal('canvas'),
  Type.Literal('glossy'),
]);

export const PhotosQuery = Type.Optional(
  Type.Partial(
    Type.Object({
      sortBy: Type.Literal('orderCount'),
      texture: PhotosQueryTexture,
    })
  )
);

export type PhotosQueryTextureType = Static<typeof PhotosQueryTexture>;

export type PhotosQueryType = Static<typeof PhotosQuery>;
