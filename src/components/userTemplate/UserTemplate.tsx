import { colors } from '@/styles/colors';
import styled from '@emotion/styled';
import Typo from '@/ui/typo/Typo';
import { LIGHT_3, SEMI_BOLD_4 } from '@/styles/typo';
import Thumbnail from '@/components/thumbnail/Thumbnail';

// interface Props {}

const UserTemplate = () => {
  return (
    <Wrapper>
      <MyTemplateInfo>
        <Typo type={SEMI_BOLD_4} color={colors.gray7}>
          주현 님의 마이템플릿
        </Typo>
        <Typo type={LIGHT_3}>
          저장된 템플릿 <span>18개</span>
        </Typo>
      </MyTemplateInfo>

      <Templates>
        <Thumbnail
          title="안내문 등 제목이 들어가는 위치다"
          memo="메모가 일단 표시된다 그리고 만약 사용자가 안 쓴 경우 첫 줄을 자동으로넣어준다는 메모가 일단 표시된다 그리고 만약 사용자가 안 쓴 경우 첫 줄을 자동으로넣어준다는"
          updatedAt="2022-01-12 15:24"
        />
      </Templates>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  flex: 1;
  width: 100%;
  margin-top: 20px;
  border-radius: 4px;
  overflow: hidden;
  padding: 0 0 48px 16px;
  background: ${colors.bg.light};
`;

const MyTemplateInfo = styled.div`
  width: calc(100% - 20px);
  padding: 24px 20px 12px 12px;
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid ${colors.gray3};
  span {
    margin-left: 2px;
    color: ${colors.primary};
    text-decoration: underline;
  }
`;

const Templates = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(238px, 1fr));
  row-gap: 16px;
  width: calc(100% - 16px);
  height: calc(100% - 48px);
  padding: 18px 10px 32px 10px;
  overflow-y: auto;
  overflow-x: hidden;
  ::-webkit-scrollbar-thumb {
    background-color: ${colors.primary};
    border-radius: 15px;
  }
  ::-webkit-scrollbar {
    width: 3px;
  }
  ::-webkit-scrollbar-track {
    margin-top: 18px;
  }
`;

export default UserTemplate;
