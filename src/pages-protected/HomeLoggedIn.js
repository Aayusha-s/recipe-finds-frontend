import HeaderLoggedIn from '../componentsLoggedIn/HeaderLoggedIn';
import HeroLoggedIn from '../componentsLoggedIn/HeroLoggedIn';
import CategoriesLoggedIn from '../componentsLoggedIn/CategoriesLoggedIn';
import PopularLoggedIn from '../componentsLoggedIn/PopularLoggedIn';
import QuickLoggedIn from '../componentsLoggedIn/QuickLoggedIn';
import CommunityLoggedIn from '../componentsLoggedIn/CommunityLoggedin';
import FooterLoggedIn from '../componentsLoggedIn/FooterLoggedIn';

const HomeLoggedIn = () => {
  return (
    <div className="home-page-loggedin">
      <HeaderLoggedIn />
      <HeroLoggedIn />
      <CategoriesLoggedIn />
      <PopularLoggedIn />
      <QuickLoggedIn />
      <CommunityLoggedIn />
      <FooterLoggedIn />
    </div>
  );
};

export default HomeLoggedIn;