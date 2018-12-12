<?php
declare (strict_types = 1);

namespace Frontend\Template\Menu;

use Nusantara\Template\Components\Menu\AbstractMenu;

class MainMenu extends AbstractMenu
{
	public static function name()
	{
		return 'frontend_menu';
	}

	public function make()
	{
		$this->item('home', '/', 'Home');
	}
	
}