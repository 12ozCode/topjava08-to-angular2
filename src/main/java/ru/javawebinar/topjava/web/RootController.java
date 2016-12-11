package ru.javawebinar.topjava.web;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import ru.javawebinar.topjava.to.UserTo;
import ru.javawebinar.topjava.util.UserUtil;
import ru.javawebinar.topjava.web.controller.user.AbstractUserController;
import ru.javawebinar.topjava.web.resources.CustomReloadableResourceBundleMessageSource;

import javax.validation.Valid;
import java.util.Locale;
import java.util.Properties;

/**
 * User: gkislin
 * Date: 22.08.2014
 */
@RestController
public class RootController extends AbstractUserController {

    @Autowired
    private CustomReloadableResourceBundleMessageSource reloadableResourceBundleMessageSource;

    @PostMapping("/register")
    public void saveRegister(@Valid @RequestBody UserTo userTo) {
        super.create(UserUtil.createNewFromTo(userTo));
    }

    @RequestMapping(value = "/i18n/{locale}", method = RequestMethod.GET)
    public Properties getLocal(@PathVariable String locale) {
        return reloadableResourceBundleMessageSource.getAllMessages(new Locale(locale));
    }
}
