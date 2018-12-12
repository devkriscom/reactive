<?php
declare (strict_types = 1);

namespace Frontend;

use Nusantara\Contract\Container;
use Nusantara\AbstractViewExtension;

class Package extends AbstractViewExtension
{
	public static function name()
	{
		return 'frontend';
	}

	public static function metadata(): array
	{
		return [
			'terminal'  => 'frontend'
		];
	}

	public function setup()
	{
		$this->load('service', __DIR__.'/../config/service.yml');
		$this->load('template', __DIR__.'/../config/template.yml');
		$this->load('theme', __DIR__.'/../config/theme.yml');
	}

	public function register(array $configs = [], Container $container)
	{


	}

	
	public function compile(array $configs = [], Container $container)
	{

	}

}