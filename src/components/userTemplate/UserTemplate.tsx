import { colors } from '@/styles/colors';
import styled from '@emotion/styled';
import Typo from '@/ui/typo/Typo';
import { LIGHT_3, SEMI_BOLD_4 } from '@/styles/typo';
import Thumbnail from '@/components/thumbnail/Thumbnail';
import { useRecoilValue } from 'recoil';
import { UserAtom } from '@/recoils/user';
import { useQuery } from '@tanstack/react-query';
import { getUserTemplates } from '@/apis/template';

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
          저장된 템플릿 <span>18개</span>
        </Typo>
      </MyTemplateInfo>

      <Templates>
        {getUserTemplatesQuery.data ? (
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
          <div></div>
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

export default UserTemplate;
