import * as React from 'react';
import { styled } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
//import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Fab from '@mui/material/Fab';
import Avatar from '@mui/material/Avatar';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import LeaderboardIcon from '@mui/icons-material/Leaderboard';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import { GlobalContext, GlobalContextInterface } from '../Context/GlobalContext';
import { useNavigate } from 'react-router-dom';

const settings = ['Atleta', 'Cão', 'Duplas', 'Provas'];
const StyledFab = styled(Fab)({
  position: 'absolute',
  zIndex: 1,
  top: 5,
  left: 0,
  right: 0,
  margin: '0 auto',
});

const Offset = styled('div')(({ theme }) => theme.mixins.toolbar);

export default function BottomAppBar() {

  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null)
  const { layoutState, setLayoutState } = React.useContext(GlobalContext) as GlobalContextInterface
  const { mensagemState, setMensagemState } = React.useContext(GlobalContext) as GlobalContextInterface
  const navigate = useNavigate()

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  }

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  }

  const irPara = (url: string) => {
    if (url === 'Cão') {
      navigate('Cao')
    } else if (url === 'Atleta') {
      navigate('Person')
    } else if (url === 'Dash') {
      navigate('Home')
    }
    setAnchorElUser(null);
  }

  return (
    <React.Fragment>
      <Offset />
      <AppBar position="fixed" color='transparent' sx={{ top: 'auto', bottom: 0 }}>
        <Toolbar>
          <IconButton aria-label="Dashboard" id="Dashboard" onClick={() => irPara('Dash')}>
            <LeaderboardIcon sx={{ width: 32, height: 32 }} />
          </IconButton>
          <Box sx={{ flexGrow: 0.25 }} />
          <IconButton >
            <SearchIcon sx={{ width: 32, height: 32 }} />
          </IconButton>
          <StyledFab color="primary" aria-label="add">
            <Tooltip title="Open Menu">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <AddIcon />
              </IconButton>
            </Tooltip>
          </StyledFab>
          <Menu
            sx={{ mt: '-55px', ml: '25px' }}
            id="menu-appbar"
            anchorEl={anchorElUser}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={Boolean(anchorElUser)}
            onClose={handleCloseUserMenu}
          >
            {settings.map((setting) => (
              <MenuItem key={setting} onClick={() => irPara(setting)}>
                <Typography textAlign="center">{setting}</Typography>
              </MenuItem>
            ))}
          </Menu>

          <Box sx={{ flexGrow: 0.5 }} />
          <IconButton >
            <CalendarMonthIcon sx={{ width: 32, height: 32 }} />
          </IconButton>
          <Box sx={{ flexGrow: 0.25 }} />
          <IconButton >
            <Avatar
              alt="Foto do Usuário"
              src="img/avatar.jpg"
              sx={{ width: 32, height: 32 }}
            />
          </IconButton>
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
}