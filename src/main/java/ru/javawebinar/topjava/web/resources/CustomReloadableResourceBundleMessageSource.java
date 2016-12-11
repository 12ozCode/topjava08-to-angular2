package ru.javawebinar.topjava.web.resources;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.support.ReloadableResourceBundleMessageSource;

import java.util.Locale;
import java.util.Properties;

/**
 * Created by Dreval Viacheslav on 10.12.2016.
 */
public class CustomReloadableResourceBundleMessageSource extends ReloadableResourceBundleMessageSource {

    private static final Logger log = LoggerFactory.getLogger(CustomReloadableResourceBundleMessageSource.class);

    public Properties getAllMessages(Locale locale) {
        PropertiesHolder mergedProperties = getMergedProperties(locale);
        return mergedProperties.getProperties();
    }

}
