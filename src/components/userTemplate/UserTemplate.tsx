import { colors } from '@/styles/colors';
import styled from '@emotion/styled';
import Typo from '@/ui/typo/Typo';
import { LIGHT_1, LIGHT_3, SEMI_BOLD_4 } from '@/styles/typo';
import Thumbnail from '@/components/thumbnail/Thumbnail';
import { useRecoilValue } from 'recoil';
import { UserAtom } from '@/recoils/user';
import { useQuery } from '@tanstack/react-query';
import { getUserTemplates } from '@/apis/template';
import noTemplate from '@/assets/imgs/home_no_template.png';

const UserTemplate = () => {
  const user = useRecoilValue(UserAtom);

  const getUserTemplatesQuery = useQuery({
    queryKey: ['userTemplate'],
    queryFn: () => getUserTemplates(localStorage.getItem('userId') ?? ''),
  });

  return (
    <Wrapper>
      <MyTemplateInfo>
        <Typo type={SEMI_BOLD_4} color={colors.gray7}>
          {`${user.name && user.name + ' 님의 '}마이템플릿`}
        </Typo>
        <Typo type={LIGHT_3}>
          저장된 템플릿{' '}
          <span>{`${(getUserTemplatesQuery.data ?? []).length}개`}</span>
        </Typo>
      </MyTemplateInfo>

      <Templates>
        {getUserTemplatesQuery.data?.length ? (
          getUserTemplatesQuery.data?.map((template) => (
            <Thumbnail
              templateId={template.id}
              title={template.title}
              memo={template.memo}
              updatedAt={template.updatedAt}
              isStar={template.isStar}
            />
          ))
        ) : (
          <NoTemplateWrapper>
            <NoTemplateImage src={noTemplate} />
            <Typo type={LIGHT_1}>
              앗 아직 나의 템플릿이 없어요!
              <br />
              <b>첫 템플릿</b>을 만들어 보세요
            </Typo>
          </NoTemplateWrapper>
        )}
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
  position: relative;
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
  // grid-template-columns: repeat(auto-fit, minmax(238px, 1fr));
  grid-template-columns: repeat(auto-fit, 238px);
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

const NoTemplateWrapper = styled.div`
  margin: 0 auto;
  position: absolute;
  top: 55%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 360px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  justify-contents: space-between;
`;

const NoTemplateImage = styled.img`
  width: 272px;
  height: 232px;
  margin-bottom: 20px;
`;

export default UserTemplate;
