package com.lms.model;

import java.io.IOException;
import java.sql.Date;
import java.text.SimpleDateFormat;

import org.springframework.stereotype.Component;

import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.databind.JsonSerializer;
import com.fasterxml.jackson.databind.SerializerProvider;

@Component
public class JsonDataSerializer extends JsonSerializer<Date> {

    @Override
    public void serialize(java.sql.Date date, JsonGenerator gen, SerializerProvider serializers) throws IOException {
        SimpleDateFormat simpleDateFormat = new SimpleDateFormat("dd-MM-yyyy");
        String dateString = simpleDateFormat.format(date);
        gen.writeString(dateString);
    }

}
