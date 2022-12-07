package com.zeroCarolie.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class e_MainController {

	@RequestMapping(value="/")
	public String getMain() throws Exception {
		System.out.println("MainController - getMain");
		return "/index.html";
	}
}
