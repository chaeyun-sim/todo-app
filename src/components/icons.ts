import { lazy } from 'react';

// fa
const FaCheck = lazy(() => import('react-icons/fa').then(mod => ({ default: mod.FaCheck })));
const FaPlus = lazy(() => import('react-icons/fa').then(mod => ({ default: mod.FaPlus })));
const FiDelete = lazy(() => import('react-icons/fi').then(mod => ({ default: mod.FiDelete })));
const FiMenu = lazy(() => import('react-icons/fi').then(mod => ({ default: mod.FiMenu })));

// io5
const IoNotificationsOutline = lazy(() =>
  import('react-icons/io5').then(mod => ({ default: mod.IoNotificationsOutline }))
);

// lu
const LuLogIn = lazy(() => import('react-icons/lu').then(mod => ({ default: mod.LuLogIn })));

// gr
const GrPowerReset = lazy(() =>
  import('react-icons/gr').then(mod => ({ default: mod.GrPowerReset }))
);

// md
const MdClose = lazy(() => import('react-icons/md').then(mod => ({ default: mod.MdClose })));
const MdLogout = lazy(() => import('react-icons/md').then(mod => ({ default: mod.MdLogout })));
const MdOutlineDelete = lazy(() =>
  import('react-icons/md').then(mod => ({ default: mod.MdOutlineDelete }))
);
const MdNavigateBefore = lazy(() =>
  import('react-icons/md').then(mod => ({ default: mod.MdNavigateBefore }))
);
const MdNavigateNext = lazy(() =>
  import('react-icons/md').then(mod => ({ default: mod.MdNavigateNext }))
);

export {
  MdClose,
  FaCheck,
  MdOutlineDelete,
  GrPowerReset,
  FiMenu,
  IoNotificationsOutline,
  MdLogout,
  FiDelete,
  LuLogIn,
  FaPlus,
  MdNavigateBefore,
  MdNavigateNext,
};
