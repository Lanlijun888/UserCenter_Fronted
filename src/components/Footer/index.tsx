import { GithubOutlined } from '@ant-design/icons';
import { DefaultFooter } from '@ant-design/pro-components';
import {CODE_NAV_LINK, PLANT_LINK} from "@/constant";
const Footer: React.FC = () => {
  const defaultMessage = 'AIHD集团体验技术部出品';
  const currentYear = new Date().getFullYear();
  return (
    <DefaultFooter
      copyright={`${currentYear} ${defaultMessage}`}
      links={[
        {
          key: '编程导航',
          title: '编程导航',
          href: CODE_NAV_LINK,
          blankTarget: true,
        },
        {
          key: 'github',
          title: <GithubOutlined />,
          href: 'https://github.com/Lanlijun888',
          blankTarget: true,
        },
        {
          key: '知识星球',
          title: '知识星球',
          href: PLANT_LINK,
          blankTarget: true,
        },
      ]}
    />
  );
};
export default Footer;
