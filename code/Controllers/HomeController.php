<?php
declare (strict_types = 1);

namespace Frontend\Controllers;

use Nusantara\Contract\Message;
use Nusantara\Contract\Connection;
use Nusantara\Contract\Template;
use Nusantara\Contract\Connect;
use Nusantara\Service\Controller\AbstractController;

final class HomeController extends AbstractController {

    public static function name(): string 
    {
        return 'home';
    }

    public static function metadata(): array
    {
        return [
            'attributes'    => 
            [
                'path'      => '/'
            ]
        ];
    }

    public function execute(Message $message, Connection $connection, $template, Connect $connect)
    {
       return $connection->write($template->render('reactive.twig', []));
    }

}