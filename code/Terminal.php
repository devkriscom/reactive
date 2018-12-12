<?php
declare (strict_types = 1);

namespace Frontend;

use Nusantara\Contract\Message;
use Nusantara\Contract\Connection;
use Nusantara\Contract\Template;
use Nusantara\Contract\Connect;
use Nusantara\Contract\Template\Reactive;
use Nusantara\Service\Terminal\AbstractTerminal;

final class Terminal extends AbstractTerminal {

	protected $reactive;

	protected $connect;

	protected $template;

	public function __construct(Reactive $reactive, Connect $connect, Template $template)
	{
		$this->reactive = $reactive;

		$this->connect = $connect;

		$this->termplate = $template;
	}

	public static function name(): string 
	{
		return 'frontend';
	}

	public function process(Message $message, Connection $connection)
	{
		$this->reactive->reset();
		$headers = [];
		foreach ($message->headers->all() as $key => $header) {
			$headers[strtolower($header->getLabel())] = $header->getValue();
		}

		$this->reactive->context('header', $headers);

		$this->reactive->state('request', $message->all());

		if(null !== $theme = $this->termplate->getTheme('frontend'))
		{
			$contexts = [];
			if(isset($theme->reactive))
			{
				array_walk($theme->reactive, function($value, $key) use(&$contexts, &$theme) {
					$contexts[$key] =  $value;
				});
			}
			$this->reactive->context('theme', $contexts);
		}

		$template = $this->termplate->withTheme('frontend');

		$callback = $this->getCallback();
		if(null !== $path = $callback->get('path'))
		{
			$template->addData('route', $path);
		}

		$arguments = array($message, $connection, $template, $this->connect);

		if(is_callable($callback))
		{
			return call_user_func_array($callback, $arguments);

		} elseif(is_object($callback) && is_callable(array($callback, 'execute'))) {

			return call_user_func_array(array($callback, 'execute'), $arguments);

		} elseif(is_object($callback) && is_callable(array($callback, '__invoke'))) {

			return call_user_func_array(array($callback, '__invoke'), $arguments);

		} else {
			throw new \Exception("Callback not callable", 1);
		}
	}

}