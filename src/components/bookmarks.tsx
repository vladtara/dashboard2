import styled from "styled-components";
import {
  Headline,
  Item,
  ItemList,
  ListContainer,
  SubHeadline,
} from "./elements";

const GroupContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 2 1 auto;
  padding: 1rem 0;
`;

const BookmarkElement = styled.a`
  font-weight: 400;
  text-decoration: none;
  color: ${(props) => props.theme.accentColor};
  padding-top: 0.75rem;
  font-size: 0.9rem;

  &:hover {
    text-decoration: underline;
  }
`;

export interface IBookmarkProps {
  name: string;
  url: string;
  newTab?: boolean;
}

export interface IBookmarkGroupProps {
  name: string;
  items: Array<IBookmarkProps>;
}

export interface IBookmarkListProps {
  groups?: Array<IBookmarkGroupProps>;
}

export const Bookmark = ({ name, url, newTab }: IBookmarkProps) => {
  const linkAttrs =
    newTab !== undefined && newTab
      ? {
          target: "_blank",
          rel: "noopener noreferrer",
        }
      : {};

  return (
    <BookmarkElement href={url} {...linkAttrs}>
      {name}
    </BookmarkElement>
  );
};

/**
 * Renders a given bookmark group
 * @param {IBookmarkGroupProps} props given props of the bookmark group
 * @returns {React.ReactNode} the bookmark group component
 */
export const BookmarkGroup = ({ name, items }: IBookmarkGroupProps) => (
  <Item>
    <GroupContainer>
      <SubHeadline>{name}</SubHeadline>
      {items.map(({ name, url, newTab }, index) => (
        <Bookmark
          key={[name, index].join("")}
          name={name}
          url={url}
          newTab={newTab}
        />
      ))}
    </GroupContainer>
  </Item>
);

/**
 * Renders a given list of categorized bookmarks
 * @param {IBookmarkListProps} props props of the given bookmark list
 * @returns {React.ReactNode} the bookmark list component
 */
const BookmarkList = ({ groups }: IBookmarkListProps) => {
  if (groups === undefined || groups.length <= 0) return <></>;

  return (
    <ListContainer>
      <Headline>Bookmarks</Headline>
      <ItemList>
        {groups.map(({ name, items }, index) => (
          <BookmarkGroup
            key={[name, index].join("")}
            name={name}
            items={items}
          />
        ))}
      </ItemList>
    </ListContainer>
  );
};

export default BookmarkList;
